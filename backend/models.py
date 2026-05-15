from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base
from datetime import datetime

class Link(Base):
	__tablename__ = "tblLinks"
	linkID = Column(Integer, primary_key=True,autoincrement=True)
	linkURL = Column(String, nullable=False)
	linkCode = Column(String, nullable=False)
	linkCreatedAt = Column(DateTime, default=datetime.utcnow)
	
