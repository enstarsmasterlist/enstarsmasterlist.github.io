// hash integration by gh/kagiura
// hash will be a kebab case string of story names, delimited by ;
// if hash exists: take hash, and normalize to kebab case
// find item with h2 that matches hash (can be multiple)
// if found, create a lightbox with the content of the item
// if not found, do nothing

$(document).ready(function () {
  if (window.location.hash) {
    var hash = window.location.hash
      .substring(1)
      .replace(/_/g, "-")
      .replace(/%20/g, "-")
      .replace(/＊/g, "")
      .replace(/"/g, "")
      .toLowerCase();
    // separate hash by ;
    hash = hash.split(";");
    console.log(hash);
    var allH2s = $("h2")
      .toArray()
      .map((h2) => {
        return {
          kebabTitle: h2.textContent.toLowerCase().replace(/ /g, "-"),
          element: h2,
        };
      });
    var $matchingH2s = allH2s.filter((h2) => hash.includes(h2.kebabTitle));
    var $item = $matchingH2s.map((h2) => $(h2.element).closest(".item"));
    console.log(allH2s, $item);
    if ($item.length) {
      var $lightbox = $(`<div class="lightbox"></div>`);
      for (var i = 0; i < $item.length; i++) {
        $lightbox.append($item[i].clone());
      }
      $("body").prepend($lightbox);
      $("body").addClass("lightbox-visible");
      var $closeButton = $(
        `<a class="close-lightbox">See other translations</a>`
      );
      $lightbox.append($closeButton);
      $closeButton.click(function () {
        $lightbox.remove();
        $("body").removeClass("lightbox-visible");
      });
    }
  }
});
