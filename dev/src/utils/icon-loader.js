import iconList from '../../assets/icons/icons';

class IconLoader {
  constructor() {
    this.init()
  }
  
  setupIconContainers() {
    this.iconContainers = document.querySelectorAll('i.icon');
    this.injectSvg();
  }

  injectSvg() {
    this.iconContainers.forEach(icon => {
      if(icon.dataset.svg) {
        iconList.forEach(svgObj => {
          if(icon.dataset.svg === svgObj.name) {
            icon.innerHTML = svgObj.svgPath
          }
        });
      }
    });

  }

  init() {
    this.setupIconContainers();
  }
}

export default IconLoader;