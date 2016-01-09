# URL Shortener
User stories:
- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- When I visit that shortened URL, it will redirect me to my original link.

Example creation usage:

https://url-shortener-jaycrypto.c9users.io/new/https://www.google.com 

https://url-shortener-jaycrypto.c9users.io/new/http://freecodecamp.com/news

Example creation output:

{ original_url: "http://freecodecamp.com/news", short_url: "https://url-shortener-jaycrypto.c9users.io/1" }

Usage:

https://url-shortener-jaycrypto.c9users.io/1


Will redirect to:

http://freecodecamp.com/news