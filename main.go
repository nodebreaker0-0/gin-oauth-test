package main

import (
	"log"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/nodebreaker0-0/gin-oauth-test/handlers"
	"github.com/nodebreaker0-0/gin-oauth-test/middleware"
)

func main() {
	router := gin.Default()
	token, err := handlers.RandToken(64)
	if err != nil {
		log.Fatal("unable to generate random token: ", err)
	}
	store := sessions.NewCookieStore([]byte(token))
	store.Options(sessions.Options{
		Path:     "/",
		MaxAge:   600,
		HttpOnly: true,
		Secure:   true,
	})
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	router.Use(sessions.Sessions("adminsession", store))
	router.Static("/css", "./static/css")
	router.Static("/img", "./static/img")
	router.LoadHTMLGlob("templates/*")

	//router.GET("/", handlers.IndexHandler)
	router.GET("/login", handlers.LoginHandler)
	router.GET("/auth", handlers.AuthHandler)

	router.Use(middleware.AuthorizeRequest())
	{
		router.Use(static.Serve("/", static.LocalFile("./all-in-one-admin/build", true)))
		router.GET("/GetnodeStatus", handlers.GetnodeStatusHandler)
		router.GET("/GetvalidatorSignInfo", handlers.GetvalidatorSignInfo)
	}

	if err := router.RunTLS(":443", "./server.crt", "./server.key"); err != nil {
		log.Fatal(err)
	}
}
