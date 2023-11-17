<a name="readme-top"></a>



<div align="center">
  <a href="https://github.com/pink-hat-hacker/allergen-ai">
    <img src="src/assets/logo.png" alt="Logo">
  </a>
    <a href="https://pink-hat-hacker.github.io/allergen-ai">View Site</a>
    ·
    <a href="https://github.com/pink-hat-hacker/allergen-ai/issues">Report Bug or Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

As someone who forgets to ask if a dish has any allergens in it (peanuts and tree nuts in my case), I thought building this helpful tool might be cool. Take a picture of your food, upload it, execute the API calls, and *voila* ... food, ingredients, and potential allergens are detected for you. No need for social interaction!

*P.S. This is for educational and experimental purposes only. Do not use this as official. Consult your food provider or official nutritional information*

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

#### Front End
* ![React.js]
* ![javascript]
* <a href="https://www.radix-ui.com/"><img src="https://avatars.githubusercontent.com/u/75042455?s=280&v=4" height="50" alt="radix-ui"/></a>

#### Back End
* ![firebase-url]
* ![gh-pages]
* <a href="https://logmeal.es/api"><img src="https://logmeal.es/static/image/brand/logmeal-api-logo.svg" width="150" alt="logmeal.es"/></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

### Prerequisites
`npm i`

- radix-ui
- radix-ui/themes
- radix-ui/icons
- firebase
- gh-pages --save-dev

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [LogMeal.es](https://logmeal.es) and create database with [Firebase DB](https://firebase.google.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `src/config.js`
    ```
    export const configuration = {
        LOGMEAL_API_KEY: 'YOUR LOGMEAL API KEY',
        LOGMEAL_API_URL: 'https://api.logmeal.es',
        LOGMEAL_API_DISHPATH: '/v2/image/segmentation/complete/v1.0?language=eng',
        LOGMEAL_API_NUTRIPATH: '/v2/nutrition/recipe/ingredients/v1.0?language=eng'
    };

    export const firebaseConfig = {
        apiKey: "YOUR FIREBASE KEY",
        authDomain: "YOURPROJECT.firebaseapp.com",
        databaseURL: "YOUR DATABASE URL",
        projectId: "YOUR PROJECT ID",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    }

    ```

<!-- ROADMAP -->
## Roadmap

- [ ] Add Error Alerts
- [ ] Host on Vercel
- [ ] Multi-language Support
    - [ ] Spanish

See the [open issues](https://github.com/pink-hat-hacker/allergen-ai/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

<a href="mailto:zyv@udel.edu" target="blank"><img align="center"
         src="https://img.shields.io/badge/gmail-EA4335.svg?style=for-the-badge&logo=gmail&logoColor=white"
         alt="PHH" height="30"/></a>

[![][linkedin-shield]][linkedin-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



[linkedin-url]: https://linkedin.com/in/zoe-yoyo-valladares
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: src/assets/pagescreenshot.png
[firebase-url]: https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[radix-ui]: https://avatars.githubusercontent.com/u/75042455?s=280&v=4
[javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[logmeal]: https://logmeal.es/static/image/brand/logmeal-api-logo.svg
[gh-pages]:https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white