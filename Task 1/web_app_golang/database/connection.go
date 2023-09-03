package database

import (
	"mygoauth/models"

	"gorm.io/driver/mysql"
	_ "github.com/go-sql-driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	connection, err := gorm.Open(mysql.Open("root:Ad@9839464490@/aditya"), &gorm.Config{})

	if err != nil {
		panic("could not connect to database")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}