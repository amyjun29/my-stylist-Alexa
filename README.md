# my-stylist-Alexa

## Inspiration

When you're busy in the morning or too excited about a date the next day, it can be hard to pick the best outfit to wear that it ends up taking hours to decide. With the help of our smart Amazon Alexa, picking an outfit can be easy!

## What it does

When you open "my stylist" with Alexa, you can ask her for outfit suggestions by providing her a location. Alexa will automatically check the weather of the given day (or the day next) and location to suggest an outfit idea from an array of outfit suggestions according to the weather summary and temperature. 

## How I built it

I used Amazon's developer portal and AWS Lambda written with node.js and some javascript.
By using two APIs, one to geocode the user's given location and one (Dark Sky API) to get the weather information, 
Alexa retrieves the weather data of the given location. With if statements, I enabled Alexa to give outfit suggestions based on the temperature, highest and minimum temperature difference, weather summary, etc. Then I supplied an array of outfit suggestions to go with each category for Alexa to randomly generate an answer from. 
When the user simply asks Alexa, "Alexa, what should I wear tomorrow/today?" with a location, she responses with suggestions. 

## Challenges I ran into

This was my first time using any APIs and the AWS platform so I had to teach myself everything from scratch. 
Working alone without getting any help from friends or professors was the toughest part. Because there wasn't just one API that would simply do all the jobs I needed my project to do, I had to use two different APIs and linking the two and setting it up to call one from the another was tough. 

## Accomplishments that I'm proud of

I'm most proud that I was able to finish my project and execute Alexa responses just how I wanted it to be. 
I'm also proud that I was able to use many external resources, (google, stackoverflow, youtube) to work on my own, although I had some tough time. 
 
## What I learned

I learned that although working alone can be tough and lonely, it is a great learning opportunity to really test the limits and challenge oneself. 
I learned that Amazon has a great platform for many hackers to work with and I was able to learn how to use APIs to my needs and how to code better in javascript.  I also learned that Alexa is a great and friendly friend!


## What's next for My Stylist Alexa

In the future, I hope to be able to ask Alexa for outfit suggestions given any day of the week. 
I also hope to add a feature where Alexa can suggest specific clothes from pre-selected / pre-favorited clothing brands instead of general clothing items.  
