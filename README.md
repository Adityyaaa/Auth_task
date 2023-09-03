# TASK 1(a). Golang JWT Authentication-

"run go main.go"
Run above command for successfully running the file. It will be running at port 8000.


## ABOUT JWT AUTHENTICATION USING GOLANG-

JWT (JSON Web Token) authentication is a popular method for securing web applications and APIs by providing a secure way to transmit information between parties. Go, also known as Golang, is a programming language that is well-suited for building efficient and high-performance web services, making it an excellent choice for implementing JWT authentication.

JWT is a compact, self-contained token format that consists of three parts: a header, a payload, and a signature. It is typically used for authentication and authorization purposes. The header contains information about the token, such as its type and the signing algorithm used. The payload contains claims, which are statements about the user or entity, while the signature is used to verify the authenticity of the token.


## IMPLEMENTATION OVERVIEW-

I will be using go "fiber framework", fiber is a framework inspired by ExpressJS. It was developed with speed and simplicity in mind, making it an excellent choice for building efficient web applications and APIs.Key features of Fiber include a fast routing system, flexible middleware support, built-in error handling, static file serving, WebSocket support, and a testing framework.

I will be connecting to our local database with "MySQL Workbench". For connecting to our local database we will be using "GORM". We will be using driver MySQL for Gorm. 
GORM, or Go Object-Relational Mapping, is a popular Go (Golang) library that simplifies database interactions by providing an elegant and efficient way to work with relational databases. It serves as an Object-Relational Mapping (ORM) tool, bridging the gap between Go's native data structures and a wide range of relational databases, such as MySQL


## 1. Register Implementation-

In the register be sending a POST Request to "localhost:8000/api/register". To parse the data we will be using "c.BodyParser(&data)". 
I will be using "POSTMAN" for handling requests.
I will send raw data while includes- (example)

{
    "name": "Aditya Awasthi",
    "email": "aditya.awasthi612@gmail.com",
    "password":"123456"
} 

To store the data in the database I will be creating "User Table" in the database.
I have "user.go" file in which I will be creating struct which is similar to classes in other language-

type User struct {
	Id       uint  `json:"id"`
	Name     string `json:"name"`
	Email    string `gorm:"unique"`   (for uniques email id)
	Password []byte  `json:"-"`
}

[![Records-In-Database.png](https://i.postimg.cc/0jqp9GQQ/Records-In-Database.png)](https://postimg.cc/dk47ByGP)

I have created migration to create a table in our database, to connect we hav function 
"connection.AutoMigrate(&models.User{})"
to automigrate the users.

I have used "golang.org/x/crypto/bcrypt" package to hash the password and sending a post req to the url "localhost:8000/api/register".

[![Register-User.png](https://i.postimg.cc/L8ddtxBK/Register-User.png)](https://postimg.cc/QHqnsky0)

I have user "database.DB.Create(&user)" where user is the reference for creating or inserting users in the database.


## 2. Login Implementation-

In the register be sending a POST Request to "localhost:8000/api/login". We will be sending the email and password as login credentials. 

I have used 
"database.DB.Where("email = ?", data["email"]).First(&user)" 
to fetch the user email in database.

If user.ID == 0 then "user not found" message will be displayed with Status=StatusNotFound

To compare the password I have used 
"bcrypt.CompareHashAndPassword(password, []byte)" 
which will compare password-

If correct password- "return user"

[![Right-Password.png](https://i.postimg.cc/6QbxvtMz/Right-Password.png)](https://postimg.cc/SX9P0FFz)

If incorrect passsword- "incorrect password"

[![Wrong-Password.png](https://i.postimg.cc/tRvnr8P6/Wrong-Password.png)](https://postimg.cc/CdDK5PcM)


## JWT Token-

I have installed a package "github.com/dgrijalva/jwt-go" and used method following method to generate a JWT TOKEN-

claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

 [![JWT-Token.png](https://i.postimg.cc/xT5VqBkz/JWT-Token.png)](https://postimg.cc/7f5WWsnH)

The token will be expired in 24 hours. The secret key will be stored in our app.

const SecretKey = "secret"
token, err := claims.SignedString([]byte(SecretKey))

 [![JWT-Token-Terminal.png](https://i.postimg.cc/GpMB04r9/JWT-Token-Terminal.png)](https://postimg.cc/8F6kMP7V)

I haved stored the JWT Token in Cookies-

cookie := fiber.Cookie {
		Name: "jwt",
		Value: token,
		Expires: time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie((&cookie))

 [![Cookies.png](https://i.postimg.cc/HsVKd5pG/Cookies.png)](https://postimg.cc/ZCzjLWBj)


I have displayed "success" as message as cookie will not displayed in front-end part for not able to access it. I will use this cookie for retrieving the user.


## 3. Authenticate User Implementation-

To authenticate user I have to first get the cookie using this function- "cookie := c.Cookies("jwt")" 

To retrieve the user I have following function- 

token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

I have send a GET req to authenticate the user which will be returning an issuing id and expiring time.

[![User.png](https://i.postimg.cc/W1yPC68X/User.png)](https://postimg.cc/nXq5Qm6D)

I have sended the cookie and retrived the user. The query to our database for verifying user and returned the user is as follows- 

"database.DB.Where("id = ?", claims.Issuer).First(&user)"
return c.JSON(user)


## 4. Logout Implementation-

For successsfully removing the cookie I have displayed the message "success".

[![Logout.png](https://i.postimg.cc/qqTQZD9c/Logout.png)](https://postimg.cc/TLtrK02h)


# TASK 1(b). React Web Application-

The login page has Email and password as credentials.

[![User.png](https://i.postimg.cc/W1yPC68X/User.png)](https://postimg.cc/nXq5Qm6D)

[![Console-User-In-Register-Page.png](https://i.postimg.cc/fWVWHwLW/Console-User-In-Register-Page.png)](https://postimg.cc/3WHHNQmz)

It will be a POST request for the login option. 
I have fetched the cookies from the server. JWT Token is stored in cookies and it will be generated for every user for every time the user will login.

[![Cookie.png](https://i.postimg.cc/s20dSh5Y/Cookie.png)](https://postimg.cc/gwRTbrSj)

After successfully completion of login the user will be automatically redirected to home page.

Here is the authenticated user.

[![Authenticated-User.png](https://i.postimg.cc/T1JtVzBz/Authenticated-User.png)](https://postimg.cc/bSd08Byg)
