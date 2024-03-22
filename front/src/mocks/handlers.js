import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/posts", () => {
    console.log('Captured a "GET /posts" request');
  }),
  http.post("/posts", () => {
    console.log('Captured a "POST /posts" request');
  }),
  http.delete("/posts/:id", ({ params }) => {
    console.log(`Captured a "DELETE /posts/${params.id}" request`);
  }),
  http.get("/api/users", () => {
    return HttpResponse.json([
      {
        id: 1,
        nickName: "Ham",
        profileImg: "/fake-img.png",
      },
    ]);
  }),

  http.get("/chart", () => {
    return HttpResponse.json([
      {
        id: 1,
        perfumeName: "Orchid 2019 Zara",
        perfumeImg: "https://fimgs.net/mdimg/perfume/375x500.53999.jpg",
        brandName: "Zara",
        brandImg: "https://fimgs.net/mdimg/dizajneri/m.642.jpg",
        profileImg: "/fake-img.png",
        RadioNodeListing: 3.77,
        bestRate: 5,
        vote: 408,
        accords: {
          citrus: "100",
          floral: "82.2164",
          "fresh spicy": "65%",
          powdery: "58.2839%",
          sweet: "56.1081%",
          aromatic: "51.0001%",
        },
        favorite: {
          love: "35.0711",
          like: "100",
          ok: "39.3365",
          dislike: "16.5877",
          hate: "2.36967",
        },
        season: {
          winter: "9.26829",
          spring: "99.0244",
          summer: "83.9024",
          fall: "20.9756",
          day: "100",
          night: "13.1707",
        },
        longevity: {
          veryWeak: 22,
          weak: 80,
          moderate: 102,
          longLasting: 14,
          eternal: 6,
        },
        sillage: {
          intimate: 68,
          moderate: 135,
          strong: 30,
          enormous: 21,
        },
        gender: {
          female: 147,
          moreFemale: 20,
          unisex: 11,
          moreMale: 1,
          male: 0,
        },
        pricevalue: {
          wayOverpriced: 1,
          overpriced: 3,
          ok: 22,
          goodValue: 59,
          greatValue: 101,
        },
        notes: {
          "Top Notes": "Bergamot",
          "Middle Notes": "Orchid",
          "Base Notes": "Vanilla",
        },
      },
    ]);
  }),
];
