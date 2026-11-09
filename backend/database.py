from sqlmodel import SQLModel, create_engine

# Format: mysql+pymysql://<username>:<password>@<rds-endpoint>:3306/<db_name>
DATABASE_URL = "mysql+pymysql://admin:xkKjVBi7p6r9PxMvxA1W@database-1.cfhpfm12kfjd.us-east-1.rds.amazonaws.com:3306/surveydb"

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)