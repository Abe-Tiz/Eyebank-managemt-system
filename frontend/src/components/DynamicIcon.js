import React from "react";
import * as MdIcons from "react-icons/md"; // Material Design icons
import * as FaIcons from "react-icons/fa"; // Font Awesome icons
import * as IoIcons from "react-icons/io"; // Ionicons

const iconLibraries = {
  md: MdIcons,
  fa: FaIcons,
  io: IoIcons,
};

const DynamicIcon = ({ library, iconName, className }) => {
  const IconComponent = library && iconName ? iconLibraries[library][iconName] : null;
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default DynamicIcon;
