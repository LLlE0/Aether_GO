package handler

import (
	"database/sql"
	"github.com/LLlE0/aether/pkg/service"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/gorilla/sessions"
	"net/http"
	//"path"
)

type Handler struct {
	//service - running an application
	Services *service.Service
	//server - config the http server
	Server *service.Server
	//dbinstance - operations with database
	DBInstance *sql.DB
	//sessionsstore - store and work with cookies
	SessionsStore *sessions.CookieStore
}

// Constructor of a handler
func NewHandler(services *service.Service, server *service.Server, DB *sql.DB) *Handler {
	return &Handler{Services: services, Server: server, DBInstance: DB, SessionsStore: NewSessionStorage()}
}

// API-Handler itself
func (h *Handler) InitRoutes() *chi.Mux {

	/////////////////////////////////////////////////////////////////////////////////////////////
	//init new router
	r := chi.NewRouter()
	// redirect /auth/ to /auth
	r.Use(middleware.RedirectSlashes)
	//seek for js in the 'js' folder
	fs := http.FileServer(http.Dir("../frontend/"))
	//seek for files all around the /frontend/ folder
	r.Handle("/*", fs)

	//serve all the api-routes

	/////////////////////////////////////////////////////////////////////////////////////////////
	r.Get("/auth", h.Auth)

	/////////////////////////////////////////////////////////////////////////////////////////////
	r.Post("/auth/try", h.AuthTry)

	/////////////////////////////////////////////////////////////////////////////////////////////
	r.Get("/", h.MainPage)

	/////////////////////////////////////////////////////////////////////////////////////////////
	r.Get("/reg", h.Registration)

	/////////////////////////////////////////////////////////////////////////////////////////////
	r.Post("/reg/new", h.RegNew)

	return r
}
