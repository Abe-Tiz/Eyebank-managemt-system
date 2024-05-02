import React from "react";
import * as MdIcons from "react-icons/md"; // Material Design icons
import * as FaIcons from "react-icons/fa"; // Font Awesome icons
import * as IoIcons from "react-icons/io"; // Ionicons
import * as PiIcons from "react-icons/pi"; // Ionicons
import * as CiIcons from "react-icons/ci";  
import * as VscIcons from "react-icons/vsc";  
import * as GrcIcons from "react-icons/gr";  
import * as TbcIcons from "react-icons/tb";  
import * as GicIcons from "react-icons/gi";  
import * as BscIcons from "react-icons/bs";  
import * as BicIcons from "react-icons/bi";  

const iconLibraries = {
  md: MdIcons,
  fa: FaIcons,
  io: IoIcons,
  pi: PiIcons,
  ci: CiIcons,
  vsc: VscIcons,
  gr: GrcIcons,
  tb: TbcIcons,
  gi: GicIcons,
  bs: BscIcons,
  bi: BicIcons,
};

const DynamicIcon = ({ library, iconName, className }) => {
  const IconComponent = library && iconName ? iconLibraries[library][iconName] : <p> No Icon</p> ;
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default DynamicIcon;
