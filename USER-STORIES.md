# Quiz App user stories

## Home page
When a user lands on the home page, they should  see
  1. Header section
  2. Main section
  3. Footer section

### Header section

The header should have an appropriate logo on the left. On the right, there should be a section which displays links with the text "About", "History" and "License".
1. When a user clicks the header logo, they should be taken to the main page if they are on another page.
2. When a user clicks the about link, they should be taken to a page which displays text explaining more about the app. The URL in the address bar must change. This page should have a link which takes them back to the main page. .
3. When a user clicks the license link, they should be taken to a page which displays the license information of the app. The URL in the address bar must change if a user navigates to this page. This page should have a link which takes them back to the main page.
4. When a user clicks the history link, they should be taken to a page which displays the player's history. If it is their first time playing the quiz, the text "You haven't attempted any quiz yet" should be displayed. The URL in the address bar must change. This page should have a link which takes them back to the main page.

### Main section

The main section should have an appropriate welcoming message and a link with text "ATTEMPT QUIZ". When this link is clicked, the user should be taken to a page where they select quiz category and difficulty level.

1. When a user clicks the link with the text "ATTEMPT QUIZ" on the welcoming page, the URL displayed in the address bar should change and the user should be taken to a page where he selects  quiz category, difficulty level and then continue to the quiz.
2. The URL in the address bar should have a query string indicating the quiz category and the difficulty level selected.
3. This is where the quiz category and total quiz count in each category are fetched. They have to be fetched once when the component is rendered the very first time.
4. There should be a default quiz category and difficulty level selected but a user is free to change them.
5. There should be a link, if clicked should take the user to a page displaying the first question and the possible solutions. The URL in the address bar should change as well. This page shouldn't display the quiz category and difficulty level dropdowns.

#### Questions and Solutions

1. The questions and solutions belong in the main section
2. The URL in the address bar must be different for the different questions.
3. The Questions and Solutions component should display Question in heading tag and the actual question in paragraph tag.
4. Similarly, the Questions and Solutions component should display Solutions in heading tag and the actual question in paragraph tag. The heading tags used in this section and previous one must be of the same level. 
5. There should be links for navigating from the current question to the next/previous questions.
6. A user should submit solution for the current question before proceeding to the next question. If a user has not submitted solution for the current question and wants to proceed to the next question, prompt the user to first submit a solution before going to the next question.
7. If a user reaches the end of the quiz, display their total score and give them an option to either play again or go to the main page.

#### Total score

### Footer section

The footer section displays copyright information and more information about the person who coded the app.
 1. Provide the name of the person who coded the app. The name should be a link to the linkedIn page or GitHub page.
 2. Provide option for sharing the app via social media. That means there should be OGP meta tags. Clicking the link should open the app if it is installed or open the site in a blank page.
 3. Provide information about the source of the trivia questions and a link to the site.
 4. Provide copyright information which is a link to the copyright page.