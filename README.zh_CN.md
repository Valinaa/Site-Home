# Home-Site
[English Document](<README.md>)
## Site-Home
- 个人主页页面
- 借鉴[Tomotoes的个人主页](https://github.com/Tomotoes/HomePage)
- 嘎嘎炫酷
- 欢迎交流使用
### 可定制化介绍
- 大部分定制化可见[Tomotoes的个人主页](https://github.com/Tomotoes/HomePage)
- 本项目添加了main页面到intro页面的回溯(reload的原始方式，欢迎大佬前来提供更优秀的方法，源文件-->js/main.js)
- 在js/log.min.js中，可以修改控制台打印的结果
- 针对图标替换，可以自己增删图标，但是需要在[阿里巴巴矢量图标库](https://www.iconfont.cn)进行以下操作: 
  1. 创建账号，新建项目，选取所有心仪的图标等导入到项目中(***请把所有要用的图标一次性导入，不然以后修改需要额外修改scss文件***)
  2. (可选) 编辑项目，设置字体格式(其中SVG、TTF等默认不勾选，若要兼容低版本浏览器，可以勾选)
  3. 先将所有图标改成白色，随后选择font-class，点击“查看在线链接”，将提供给您的css文件引入项目，或者直接打开css文件，将其中的部分代码粘贴到自己的scss文件中
  4. 删除全部原有的font-face属性以及图标配置(.icon-xxx)，仅保留.icon选择器的内容(如果想使用原先的图标，请寻找后添加到项目中)
  5. 完成以上操作，就可以自定义设计图标啦！
