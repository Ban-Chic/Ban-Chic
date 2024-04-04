from sqlalchemy import Column, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Heart(Base):
    __tablename__ = "heart"
    heart_id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    modified_at = Column(DateTime)
    member_id = Column(Integer)
    perfume_id = Column(Integer)

class Chugumi(Base):
    __tablename__ = "persuit"
    persuit_id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    modified_at = Column(DateTime)
    casual = Column(Integer)
    chic = Column(Integer)
    classic = Column(Integer)
    clear = Column(Integer)
    coolcasual = Column(Integer)
    dandy = Column(Integer)
    dynamic = Column(Integer)
    elegant = Column(Integer)
    gorgeous = Column(Integer)
    modern = Column(Integer)
    natural_persuit = Column(Integer)
    pretty = Column(Integer)
    romantic = Column(Integer)
    wild = Column(Integer)
    member_id = Column(Integer)