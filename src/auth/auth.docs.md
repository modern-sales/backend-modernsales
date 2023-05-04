# Documentation for the authentication route [/auth]



# Sign up 
    1. New users enter their primary email and submit it to receive a OTP via that email - sent to the api route /auth/otp
    2. The backend checks to see if there is any current user with that email address and then generates a OTP and sends it to their inbox via AWS SES
    3. The Sign up form then takes their name and the OTP
    4. These new pieces of information are passed to the backend  - /auth/signup
    5. Only after the email is verified is the user committed to the users database

# Login
    1. Users input just their email and click 'receive code via email' - their email is sent to the api route /auth/otp
    2. Users are provided with a jwt that is valid for the next 30 days, stored in httpOnly cookies
    3. 