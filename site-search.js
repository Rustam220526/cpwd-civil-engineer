(function () {
  var query = new URLSearchParams(window.location.search).get("siteSearch");
  if (!query || !query.trim()) return;
  query = query.trim().replace(/\s+/g, " ").toLocaleLowerCase();

  function findMatch() {
    var target = null;
    if (window.location.hash) {
      try {
        target = document.getElementById(
          decodeURIComponent(window.location.hash.slice(1)),
        );
      } catch (error) {
        target = null;
      }
    }
    var root = target || document.body;
    var candidates = [];
    if (root.matches && root.matches("p,li,td,th,dt,dd,h1,h2,h3,h4,h5,h6"))
      candidates.push(root);
    candidates.push.apply(
      candidates,
      root.querySelectorAll("p,li,td,th,dt,dd,h1,h2,h3,h4,h5,h6"),
    );
    var match = candidates.find(function (element) {
      return (
        !element.closest("script,style,noscript") &&
        (element.innerText || element.textContent || "")
          .replace(/\s+/g, " ")
          .toLocaleLowerCase()
          .includes(query)
      );
    });
    if (!match && target) {
      var targetText = (target.innerText || target.textContent || "")
        .replace(/\s+/g, " ")
        .toLocaleLowerCase();
      if (targetText.includes(query)) match = target;
    }
    if (!match) return;

    match.style.setProperty("outline", "3px solid #1769aa", "important");
    match.style.setProperty("outline-offset", "5px", "important");
    match.style.setProperty("background-color", "#fff1a8", "important");
    match.style.setProperty("box-shadow", "0 0 0 8px rgba(255, 225, 111, .35)", "important");
    match.style.setProperty("border-radius", "4px", "important");
    match.style.setProperty("scroll-margin", "100px 0 32px", "important");
    match.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", function () {
      window.setTimeout(findMatch, 80);
    }, { once: true });
  else window.setTimeout(findMatch, 80);
})();
