class Settings:
    size_limit: int = 1024 * 1024 * 1024
    sqlite_db_name: str = "backend/database.db"
    sqlite_url: str = f"sqlite:///{sqlite_db_name}"
    async_sqlite_url: str = f"sqlite+aiosqlite:///{sqlite_db_name}"
    connect_args: dict = {"check_same_thread": False}