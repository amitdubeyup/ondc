# Hotel Booking API

This project encompasses the APIs tailored for hotel booking functionalities. Users have the ability to register and log in. Upon logging in, they can seamlessly search for hotels, make bookings, view booking details, and cancel reservations. The project utilizes pre-stored hotel information already residing in the database.

## Tech Stack

1. NodeJS (Version: 14+)
2. ExpressJS (Version: 4+)
3. MongoDB & Mongoose (Version: 5+)

## Quick Start

Clone the repository:

```bash
$ git clone https://github.com/amitdubeyup/ondc.git
```

Go to the project directory:

```bash
$ cd ondc
```

Install dependencies:

```bash
$ npm install
```

Start the app:

```bash
$ npm start
```

Now the app is running at: http://localhost:3000

## REST APIs Details

The REST APIs are categorized into the following: "User Details", "Hotel Details" & "Booking Details".

### User Register 

```bash
Method: POST
Header: { content-type: application/json }
URL: https://ondc-1zib.onrender.com/api/user/register
Body: {
  "name": "Amit Dubey",
  "email": "amitdubey8888@gmail.com",
  "mobile": "7610002325",
  "password": "hotel@123"
}
Response: {
  "success": true,
  "message": "User registered successfully."
}
```

### User Login 

```bash
Method: POST
Header: { content-type: application/json }
URL: https://ondc-1zib.onrender.com/api/user/login
Body: {
  "email": "amitdubey8888@gmail.com",
  "password": "hotel@123"
}
Response: {
  "success": true,
  "message": "Logged in successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY1ZjU0ZDhhNTQwODU5MTQ5OGIwZmRkNCIsIm5hbWUiOiJBbWl0IER1YmV5IiwiZW1haWwiOiJhbWl0ZHViZXk4ODg4QGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijc2MTAwMDIzMjUifSwiaWF0IjoxNzEwNTc0OTkxLCJleHAiOjE3MTA1Nzg1OTF9.YI_AQVzHrKPDuZGea4oHTo_z_Z0U_uSwN1urH0lA9RQ"
}
```

### Hotel Search 

```bash
Method: GET
Header: { content-type: application/json, token: "token received from login" }
URL: https://ondc-1zib.onrender.com/api/hotel/search?skip=0&limit=10&name=lalit
Response: {
  "success": true,
  "message": "Hotels fetched successfully.",
  "have_prev": false,
  "have_next": false,
  "data": [
    {
      "attributes": [
        "Couple Friendly",
        "Book with ₹0 Payment",
        "Guaranteed 10% Discount On F&B Services"
      ],
      "images": [
        "hotel_image_1",
        "hotel_image_2",
        "hotel_image_3",
        "hotel_image_4"
      ],
      "status": 1,
      "_id": "65f53563ad2547c337ebd8f4",
      "name": "The LaLiT New Delhi",
      "location": "Connaught Place",
      "distance": "2.6 km",
      "description": "Prime location, pristine property, pleasant atmosphere",
      "rating": "Very Good",
      "ratings_count": 8492,
      "price_per_night": 13518,
      "taxes_and_fees": 3634,
      "emi_option": "No CostEMI starts at ₹2,786",
      "special_offer": "Exclusive Offer on Citi Credit & Debit Cards. Get Flat INR 2180 off",
      "created_at": "2024-03-16T07:49:14.055Z",
      "updated_at": "2024-03-16T07:49:14.055Z"
    }
  ]
}
```

### Hotel Book 

```bash
Method: POST
Header: { content-type: application/json, token: "token received from login" }
URL: https://ondc-1zib.onrender.com/api/booking/save
Body: {
  "hotel_id": "65f53563ad2547c337ebd8f4",
  "guest_address": "Mauna, Harthua Babhanpur, Sultanpur, Uttar Pradesh - 228171",
  "check_in_date": "2024-03-16",
  "check_out_date": "2024-03-17",
  "total_price": "0",
  "number_of_guests": "1"
}
Response: {
  "success": true,
  "message": "Booking completed successfully.",
  "data": {
    "status": "confirmed",
    "_id": "65f54f845408591498b0fde1",
    "hotel_id": "65f53563ad2547c337ebd8f4",
    "guest_address": "Mauna, Harthua Babhanpur, Sultanpur, Uttar Pradesh - 228171",
    "check_in_date": "2024-03-16T00:00:00.000Z",
    "check_out_date": "2024-03-17T00:00:00.000Z",
    "total_price": 0,
    "number_of_guests": 1,
    "user_id": "65f54d8a5408591498b0fdd4",
    "booking_date": "2024-03-16T07:51:32.937Z",
    "created_at": "2024-03-16T07:51:32.937Z",
    "updated_at": "2024-03-16T07:51:32.937Z",
  }
}
```

### Booking View

```bash
Method: POST
Header: { content-type: application/json, token: "token received from login" }
URL: https://ondc-1zib.onrender.com/api/booking/view
Body: {
  "booking_id": "65f54da55408591498b0fdd8"
}
Response: {
  "success": true,
  "message": "Booking fetched successfully.",
  "data": {
    "status": "confirmed",
    "_id": "65f54da55408591498b0fdd8",
    "hotel_id": "65f53563ad2547c337ebd8f4",
    "guest_address": "Mauna, Harthua Babhanpur, Sultanpur, Uttar Pradesh - 228171",
    "check_in_date": "2024-03-16T00:00:00.000Z",
    "check_out_date": "2024-03-17T00:00:00.000Z",
    "total_price": 0,
    "number_of_guests": 1,
    "user_id": "65f54d8a5408591498b0fdd4",
    "booking_date": "2024-03-16T07:43:33.009Z",
    "created_at": "2024-03-16T07:43:33.009Z",
    "updated_at": "2024-03-16T07:43:33.009Z"
  }
}
```

### Booking Cancel

```bash
Method: GET
Header: { content-type: application/json, token: "token received from login" }
URL: https://ondc-1zib.onrender.com/api/booking/cancel
Body: {
  "booking_id": "65f54da55408591498b0fdd8"
}
Response:{
  "success": true,
  "message": "Booking cancelled successfully.",
  "data": {
    "status": "cancelled",
    "_id": "65f54da55408591498b0fdd8",
    "hotel_id": "65f53563ad2547c337ebd8f4",
    "guest_address": "Mauna, Harthua Babhanpur, Sultanpur, Uttar Pradesh - 228171",
    "check_in_date": "2024-03-16T00:00:00.000Z",
    "check_out_date": "2024-03-17T00:00:00.000Z",
    "total_price": 0,
    "number_of_guests": 1,
    "user_id": "65f54d8a5408591498b0fdd4",
    "booking_date": "2024-03-16T07:43:33.009Z",
    "created_at": "2024-03-16T07:43:33.009Z",
    "updated_at": "2024-03-16T07:43:33.009Z",
    "cancelled_date": "2024-03-16T07:52:13.677Z"
  }
}
```

## Note

In this application, I've exclusively incorporated the APIs outlined in the provided documentation.

## People

The lead maintainer is [Amit Dubey](https://github.com/amitdubeyup)

## License

[MIT](LICENSE)