import React from "react";
import * as MdIcons from "react-icons/md"; // Material Design icons
import * as FaIcons from "react-icons/fa"; // Font Awesome icons
import * as IoIcons from "react-icons/io"; // Ionicons
import * as PiIcons from "react-icons/pi"; // Ionicons
import * as CiIcons from "react-icons/ci";  
import * as VscIcons from "react-icons/vsc";  

const iconLibraries = {
  md: MdIcons,
  fa: FaIcons,
  io: IoIcons,
  pi: PiIcons,
  ci: CiIcons,
  vsc: VscIcons,
};

const DynamicIcon = ({ library, iconName, className }) => {
  const IconComponent = library && iconName ? iconLibraries[library][iconName] : <p> No Icon</p> ;
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default DynamicIcon;
