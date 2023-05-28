# Site-Home
[中文文档](<README_zh_CN.md>)
## Site-Home
- Personal Home Page
- Learn from [Tomotoes' personal page](https://github.com/Tomotoes/HomePage)
- Ultra amazing | Ultra beautiful | Ultra amazing operation
- Welcome to contact me to discuss and learn
### Customizable Introduction
- Most customizations are visible on [Tomotoes' personal page](https://github.com/Tomotoes/HomePage)
- This project has added a backtrace from the `main` page to the `intro` page (Use the original method of `reload` and welcome to provide better methods, source file ->js/main. js)
- In js/log.min.js, you can modify the results printed by the console
- For icon replacement, you can add or remove icons, but you need to operate in the [Alibaba Vector Icon Library](https://www.iconfont.cn). Follow steps:
  1. Create an account, then a new project, select all desired icons you love, etc., and import them into the project (***Please import all the icons you want to use at once, otherwise future modifications will require additional modifications to the scss file***)
  2. (Optional) Edit the item and set the font format (SVG, TTF, etc. are not checked by default, check them if you want to run your project with lower version browsers)
  3. First change all icons to white color, then select `font class`, click on "View The Online Link"  and you will get a `CSS` file,you can import it to your project, or open the `CSS` file and paste some of the code into your own `scss` file
  4. Delete all existing `font face` attributes and icon configurations (`.icon xxx`), leaving only the contents of the `.icon` selector (if you want to use the original icon, please search for it and add it to the project)
  5. After completing the above operations, you can customize the design icon!

Have a nice time!
