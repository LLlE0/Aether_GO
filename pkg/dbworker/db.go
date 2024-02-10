package dbworker

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/spf13/viper"
	"log"
	"os"
)

func NewDBInstance() *sql.DB {
	sqlDB, err := sql.Open("mysql", viper.GetString("dbkey"))
	if err != nil {
		log.Fatal(err)
	}
	dbinit, err := os.ReadFile("../configs/db_init")
	if err != nil {
		log.Print(err)
	}
	if _, err = sqlDB.Exec(string(dbinit)); err != nil {
		log.Print(err)
	}
	log.Print("Successfully connxted to DB")
	return sqlDB

}
