import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from keras.preprocessing.image import img_to_array
from keras.models import load_model
from model import Heart, Chugumi
import db

imageModel = load_model('model-for-male.h5')

def get_recommend_perfume(req):
    # 1. parse json & make user-chugumi dataframe
    column_order = ['casual', 'chic', 'classic', 'clear', 'coolcasual', 'dandy', 'dynamic', 'elegant',
                    'gorgeous', 'modern', 'natural', 'pretty', 'romantic', 'wild']

    req_obj = vars(req)
    user_image = pd.DataFrame(req_obj, index=[0]).reindex(columns=column_order)

    # 2.   perfumes-chugumi csv
    perfumes = pd.read_csv('./perfume_data.csv', index_col=False, encoding='cp949')

    # 3. calculate cosine similarity
    cosine_similarity_scores = calculate_cosine_similarity(user_image, perfumes)
    cosine_similarity_scores = cosine_similarity_scores.flatten().argsort()[::-1][:10]

    # 4. return recommend perfumes
    return cosine_similarity_scores.tolist()


def calculate_cosine_similarity(user, result):
    selected_row = user  # id 값에 해당하는 행 선택
    other_rows = result.iloc[:, 1:]  # id 값과 다른 행 선택
    print(other_rows)
    similarity_scores = cosine_similarity(selected_row, other_rows)  # 코사인 유사도 계산
    return similarity_scores


def get_recommend_fashionPerfume(pred_img):
    #투명도가 있는 이미지일경우 투명도 제거
    if pred_img.mode == "RGBA":
        pred_img = pred_img.convert("RGB")
    pred_img = pred_img.resize((256, 256))
    print(pred_img)
    pred_img = img_to_array(pred_img)
    print("Shape:", pred_img.shape)
    pred_img = pred_img.reshape((1, 256, 256, 3))
    pred = imageModel.predict(pred_img)
    label = pred.argmax()
    class_list = ['casual', 'dandy', 'formal', 'sports', 'street', 'chic', 'romantic', 'girlish']

    df = pd.read_csv('./fashionPerfumes.csv', index_col=False, encoding='utf-8')
    text = df[df['fashion'] == class_list[label]]['perfumes'].tolist()
    numbers = text[0].strip('[]').split()
    # 각 숫자를 정수로 변환하여 리스트에 추가
    numbers_list = [int(num) for num in numbers]

    return { "fashion" : class_list[label], "recommend_index" : numbers_list}

def find_similar_users(member_id):
    with db.session_scope() as session:
        chugumis = session.query(Chugumi).all()
        data_to_append = []
        for chugumi in chugumis:
            data_to_append.append({
                "member_id": chugumi.member_id,
                "casual": 0 if chugumi.casual == b'\x00' else 1,
                "chic": 0 if chugumi.chic == b'\x00' else 1,
                "classic": 0 if chugumi.classic == b'\x00' else 1,
                "clear": 0 if chugumi.clear == b'\x00' else 1,
                "coolcasual": 0 if chugumi.coolcasual == b'\x00' else 1,
                "dandy": 0 if chugumi.dandy == b'\x00' else 1,
                "dynamic": 0 if chugumi.dynamic == b'\x00' else 1,
                "elegant": 0 if chugumi.elegant == b'\x00' else 1,
                "gorgeous": 0 if chugumi.gorgeous == b'\x00' else 1,
                "modern": 0 if chugumi.modern == b'\x00' else 1,
                "natural_persuit": 0 if chugumi.natural_persuit == b'\x00' else 1,
                "pretty": 0 if chugumi.pretty == b'\x00' else 1,
                "romantic": 0 if chugumi.romantic == b'\x00' else 1,
                "wild": 0 if chugumi.wild == b'\x00' else 1,
            })
        # 데이터프레임에 데이터 추가
        users = pd.DataFrame(data_to_append)
        users = users.sort_values(by="member_id")
        # 좋아요 누른 사용자들의 리스트
        user_list = users['member_id'].tolist()
        user_similarity = cosine_similarity(users.iloc[:, 1:], users.iloc[:, 1:])
        user_similarity = pd.DataFrame(user_similarity, index=user_list, columns=user_list)
        try:
            similar_users = sorted(
                [user for user in user_similarity.columns if user_similarity.loc[member_id, user] > 0 and user != member_id],
                key=lambda x: user_similarity.loc[member_id, x], reverse=True)
            result = colaborativeFilter(similar_users)
        except:
            return "존재하지 않는 사용자입니다."
        #값이 없을때는 컨텐츠 기반 필터링
        if(len(result) == 0):
            # member_id인 행 선택
            member = users[users['member_id'] == member_id]
            # casual부터 wild까지의 열 값 리스트 추출
            chugumi = member.iloc[0, 1:].tolist()
            chugumi = pd.DataFrame([chugumi], columns=['casual', 'chic', 'classic', 'clear', 'coolcasual', 'dandy', 'dynamic',
                                                 'elegant', 'gorgeous', 'modern', 'natural', 'pretty', 'romantic',
                                                 'wild'])
            # perfumes-chugumi csv 불러오기
            perfumes = pd.read_csv('./perfume_data.csv', index_col=False, encoding='cp949')

            # 3. calculate cosine similarity
            cosine_similarity_scores = calculate_cosine_similarity(chugumi, perfumes)
            cosine_similarity_scores = cosine_similarity_scores.flatten().argsort()[::-1][:10]
            print(cosine_similarity_scores.tolist())
            # 4. return recommend perfumes
            return cosine_similarity_scores.tolist()
        else:
            return result

def colaborativeFilter(member_idx):
    with db.session_scope() as session:
        # 1. 결과를 담을 집합 생성
        perfume_set = set()
        #2. db에서 hearts 정보 가져오기
        hearts = session.query(Heart).all()
        #3. SQLAlchemy 객체를 dataframe으로 변환
        heart_dicts = [{'member_id': heart.member_id,'perfume_id': heart.perfume_id} for heart in hearts]
        hearts = pd.DataFrame(heart_dicts)
        #4. 좋아요를 누른 사용자들 추려내기
        member_ids = set(hearts['member_id'])

        for member_id in member_idx :
            if member_id in member_ids:
                # 5. id값에 해당하는 좋아요누른 상품 가져오기
                result = hearts[hearts['member_id'] == member_id]['perfume_id']
                # 6. numpy 배열을 파이썬 리스트로 변환
                perfume_list = result.values.tolist()
                # 7. 리턴값에 담기
                for item in perfume_list:
                    perfume_set.add(item)
                    if len(perfume_set) == 10:
                        return list(perfume_set)
        return list(perfume_set)