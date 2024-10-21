export const handleLanguageChange = (event, i18n, setLanguage) => {
  const selectedLanguage = event.target.value;
  i18n.changeLanguage(selectedLanguage);
  setLanguage(selectedLanguage);
};

export const handleMouseEnter = (index, location, items, buttonRefs) => {
  if (location && location.pathname !== items[index].path) {
    buttonRefs.current[index].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  }
};

export const handleMouseLeave = (index, location, items, buttonRefs) => {
  if (location && location.pathname !== items[index].path) {
    buttonRefs.current[index].style.backgroundColor = "";
  }
};

export const handleClick = (index, setActiveIndex, buttonRefs) => {
  setActiveIndex(index);
  buttonRefs.current[index].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
};

export const updateActiveButtonStyles = (
  location,
  items,
  buttonRefs,
  setActiveIndex
) => {
  const currentPath = location?.pathname;
  const index = items.findIndex((item) => item.path === currentPath);
  setActiveIndex(index);

  buttonRefs.current.forEach((ref, idx) => {
    if (ref) {
      ref.style.backgroundColor = idx === index ? "rgba(0, 0, 0, 0.2)" : "";
    }
  });
};
