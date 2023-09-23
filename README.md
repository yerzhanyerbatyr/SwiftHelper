# SwiftHelper - Swifties Best Website
**AI-powered** web application that generates a random Taylor Swift’s song, quote, or finds **‘Taylor’s Version‘** of a song!  
Register, save liked songs and get **personal recommendations** based on your preferences.

![](https://media.tenor.com/ylEApGqcrjAAAAAC/taylor-swift-smile.gif)

## Agenda:
In this README file at the beginning I will briefly describe [main functionalities](https://github.com/yerzhanyerbatyr/SwiftHelper#random-quote-from-songs-taylor-owns) of the application, and at the end will tell more about the architecture and technical stack used to build it.

## Get Random Song or Quote
To get random song or quote you do **not** need to be logged in. Just press "Song" or "Quote" in the navigation bar, or interagtive buttons on the home page!

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/e1346983-7c1b-40b1-a86d-dd3617abf487)

### Random Quote (from songs Taylor owns)
If you liked the lyric, you can then listen to full version, or generate a new one!

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/09f7af60-4666-4034-9848-cf52e0976158)

### Random Song
Same here! Listen if you would like to listen it, or request a new one :)

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/2a9eee9e-4ab5-4e8d-9d83-0d02ff101ef8)
p.s. look at the font of the albums, I tried to match them as much as I could.

## Find "Taylor's Version"
If you are a true swiftie, you're likely well aware of the significance of listening to songs **Taylor owns**.  

If you do not know why Taylor re-records her albums, and what does "Taylor's Version" mean - [_here is the quick guide for you_](https://www.that.legal/blog/2023/7/13/what-is-taylors-version#:~:text=Since%202021%2C%20Taylor%20Swift%20has,the%20original%20recordings%20do%20not.)!

SwiftHelper provides you with the opportunity to listen only to Taylor's songs! Just type in the name of the song, and our app will provide you with the Spotify link and QR-code.
### Type the song name here (you do not need to be logged in):
![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/2c7c094a-4c66-4759-a48b-f768be719b3e)
By the way, you do not need to write the full song title. It is not case-sensitive and it accepts mistakenly made typos.

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/96be227e-b7c7-4d35-a14f-83935660ef3d)

### Enjoy listening! Also, you can see the text below that says that you can add the song to favourites, I will tell more about it later.
![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/bf33313e-9e16-4cbc-b315-6d13bf8abd68)

### In case you typed in the song that do not belong to Taylor, it will then offer you with a random song (which of course Taylor owns).
![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/d25d49cc-93f1-49cc-a599-50120c4a63dc)

## Authorization, authentication, and personal account

To log into the system, you need to press **'Log In'** and then enter your credentials. If you are new to the application, you can click **'Register'** at the bottom to complete the registration process in seconds!  
Rest assured, we take the **security** of your passwords seriously.

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/01cda25e-2566-4869-aefb-512e400b57dd)

### You are logged in! What's next?
If you have successfully logged in, you will notice your name in the Navigation Bar. By clicking on it, you will be redirected to your personal account. There, you can view the **list of songs** you've liked and find a special button that allows you to receive **song recommendations** with the help of AI.

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/66d14fd9-30e5-46a5-86df-e237704ef863)

## Manipulating the list of favourite songs - Adding
Remember there was a message about adding and removing songs from the list if you are logged in? Let's put it into action!  
Picture this: we randomly select a song, fetch its Spotify lyrics, and absolutely fall in love with it.  
Now, just click 'Add to Favorites', and once the song is successfully added, you'll receive a confirmation message on the website.

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/d8706e97-35fb-4746-b46f-5982b9d227e3)

## Manipulating the list of favourite songs - Removing
Oops, mistakenly added a song to the list? Or you realized that you actually do not like it? Just click 'Remove from Favorites'!

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/a1814a5a-194f-46b1-a86d-2480c13e6cba)

## Getting song recomendations
Once you've added at least one song to your favorites list, you can now leverage AI to receive song recommendations. Simply click 'Generate a Recommended Song' and enjoy the music!

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/035a1122-4013-4460-b05c-f8d0ae16eb2b)

## User Interface
Before delving into technical details, I'd like to emphasize the importance of the user interface. This includes the GIFs, photos, fonts, and all the elements carefully designed to align with the Taylor Swift theme. I'm particularly proud of the Loading Page – it's a standout feature! Hehe.

![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/e5512395-d808-4387-8946-4facd82d5055)

## Technical Stack
I primarily utilized **Node.js** for the backend server and **React.js** for the frontend. User and song databases were stored in MongoDB. Additionally, I incorporated the following **APIs**:
1) Spotify API
2) Taylor-Swift API (developed by [@MitanshiKshatriya](https://github.com/MitanshiKshatriya))
3) Google's PaLM API

These APIs have played a crucial role in enhancing the functionality and features of the application. Also developed own **RESTful** API, that was used to communicate with databases. I utilized the Passport.js library to ensure secure authorization and authentication.

## Design of SwfitHelper architecture:
![image](https://github.com/yerzhanyerbatyr/SwiftHelper/assets/106257838/3684f021-2b78-4813-99aa-1570c9e85c8a)

