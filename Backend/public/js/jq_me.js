jQuery(document).ready(function () {
  jQuery("#revolution-slider").revolution({
    sliderType: "standard",
    delay: 7500,
    navigation: {
      arrows: { enable: true },
    },
    spinner: "off",
    gridwidth: 1170,
    gridheight: 700,
    disableProgressBar: "on",
    responsiveLevels: [1920, 1229, 991, 480],
    gridwidth: [1170, 970, 750, 450],
    gridheight: [700, 700, 700, 700],
  });
});
