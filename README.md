# final-project-client

# Protect my bike

- Alert biker when their bicycle is being stolen

## User Stories

  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
  
  **Signup:** As an anon I can sign up in the platform so that I can start saving favorite restaurants
  **Login:** As a user I can login to the platform so that I can see my favorite restaurants.
  **Logout:** As a user I can logout from the platform so I can stop using it 
  
  **Profile:** As a user I would like to see my profile and manage my bike collection.
  **Add bikes:** As a user I can add bikes to my collection.
  
  **See bike details:** As a user I can see my bikes details.
  **Park my bike:** As a user I can inform that my bike is parked and what is the bike location.
  
  **Report:** As a user I can report that a bike is trying to be stolen.

## Backlog

  
# Client

## Routes

  - / - Home
  
  - /auth/signup - Signup form
  - /auth/login - Login form
  
  - /profile 
  - /add-bike 
  - /bike-detail
  
  - /select-bike -> where ?

  
  

  ### Backlog

  - /profile/:id

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  
  
- Profile Service
  - profile.me()
 
- Bike services
 - getAll()
 - getOne(id)
 - getByOwner(ownerName)
 - getByLocation()
 - createOne(data)
 - reportOne(id)
 - updateParkStatus()

## Pages

- 404 Page
- Sign in Page
- Log in Page
- Home Page
- Reporte page
- Select bike to park page
- Select where to park page.
- Profile page.
- Add bike page.
- Bike detail page.

## Components

- location bar.
- bike-park-form.
- @output changeLocation(location)
- @output park(location)

## IO


## Guards

- / Init 
- /login  anon
- /signup  anon
- /profile  user 
- /add-bike user 
- /bike-detail user 
- /select-bike user 
- /report init


# Server

## Models

  User model

  ```
  User {
    username: {
      type: string
      required: true,
    },
    password: {
      type: string,
      required: true
    },
    email: {
      type: string,
      required: true
    }
  }
  ```

  Restaurant model

  ```
  Bike {
  ownerName: {
    type: string,
    required: true
  },
  brand: {
    type: string,
    required: true
  },
  color: {
    type: string
  },
   parkStatus: {
    type: boolean
  },
  alertIntensity: {
    type: string
  },
  location: {
    type: string
  }
  
}
```

## API Endpoints/Backend Routes


  - POST /auth/signup
  - POST /auth/login
  - GET /auth/me

  - POST /bike (data) --> createOne(data)
  - PUT /bike/:id/report (empty) --> reportOne(id)
  - PUT /bike/:id/status (status, location ?) --> updateParkStatus(id, status, location)
  
  - GET/bike?location=location --> getAllByLocation(location)
  - GET/bike/mine --> getMine(ownerName)
  - GET/bike/:id --> getOne(id)
  
  
  ## OUTSIDE MVP
