import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import "./awareness.css";

const paragraphStyles={
  WebkitLineClamp:6,
  WebkitBoxOrient:'vertical',
  overflow:'hidden',
  display:'-webkit-box',
}
function Awareness() {
  const [awareness, setAwareness] = useState([]);
  const imagePath = process.env.PUBLIC_URL + '/images/eye2.png';
   const imagePath2 = process.env.PUBLIC_URL + '/images/sunglasses.jpg';
   const eyeEthiopia = process.env.PUBLIC_URL + '/images/eye-ethiop.jpg';
   const cornea= process.env.PUBLIC_URL + '/images/cornea.jpg';

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(result => {
        if (Array.isArray(result.data)) {
          setAwareness(result.data);
        } else {
          console.log('Data is not an array');
        }
      })
      .catch(err => console.log(err))
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/deleteAwareness/" + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  }
   const [isOpen, setIsOpen] = useState(false);
   const [isOpen1, setIsOpen1] = useState(false);
   const [isOpen2, setIsOpen2] = useState(false);
   const [isOpen3, setIsOpen3] = useState(false);
  return (
    <div>
      
      <div className="title text-xl font-bold italic text-purple-800 leading-tight tracking-wide    p-4">General Information About Eye Bank of Ethiopia</div>    <div className="flex  p-auto m-6 shadow-2lg w-100">
      <div className="w-1/2 border mr-5 shadow-2lg">
       <h3 className="title">Eye Bank Of Ethiopia</h3>
      
       <div flex flex-row >
       <div className="float-left ml-3 group">
  <div relative overflow-hidden>
    <img className="h-50 w-64 max-w-xl rounded " src={eyeEthiopia} alt="Person 2" />  
    <div className="mt-1 relative h-full w-full bg-black/20 -bottom-10 group-hover:bottom-0 opacity-hover:opacity-100 transition-all duration-300">
      <a href="#eyebank">
        <button className="bg-orange-500 text-white py-2 px-5 hidden group-hover:block">
          go to Video 
        </button>
      </a>
    </div>
  </div>
</div>
       <div className="px-3 cappitalize text-lg " style={isOpen? null:paragraphStyles} > The Eye Bank of Ethiopia is a specialized organization dedicated to the collection, preservation, and distribution of donor corneas for corneal 
       transplantation surgeries. As a non-profit entity, the Eye Bank plays a critical role in addressing the shortage of corneas in Ethiopia by facilitating the donation process and ensuring the availability of high-quality corneal tissue for those in need.
       </div>
     <button className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 ml-56 mt-3 rounded-full mb-3 ml-96 transform hover:scale-110" onClick={() => setIsOpen(!isOpen)}>
     {isOpen ? 'Read less...' : 'Read more...'}
     </button>
       </div>
        
     </div>
      
     <div className="w-1/2 border ml-5 mr-10  shadow-2lg" >
      <h3 className="title cappitalize">Protect Your Eye By Washing in Pure Water</h3>
     
      <div flex flex-row >
      <div className="float-left ml-3 group">
  <div relative overflow-hidden>
    <img className="h-50 w-64 max-w-xl rounded " src={imagePath} alt="Person 2" />  
    <div className="mt-1 relative h-full w-full bg-black/20 -bottom-10 group-hover:bottom-0 opacity-hover:opacity-100 transition-all duration-300">
      <a href="#eyebank">
        <button className="bg-orange-500 text-white py-2 px-5 hidden group-hover:block">
          go to Video 
        </button>
      </a>
    </div>
  </div>
</div>
       <div className="px-3 cappitalize text-lg mr-4"  style={isOpen1? null:paragraphStyles} > It functions by focusing light onto the retina, which captures visual information. Composed of several layers of specialized tissue, including the epithelium, Bowman's layer, stroma, Descemet's membrane, and endothelium, the cornea maintains transparency and structural integrity.
       to facilitate vision. Its transparency, structure, and sensitivity contribute to overall eye health and play a crucial role in visual processes.
       </div>
       
       </div>
     
         <button className="bg-blue-500 hover:bg-orange-700  transform hover:scale-110 text-white font-bold py-2 px-4 ml-96 mt-3 rounded-full mb-3" onClick={()=>setIsOpen1(!isOpen1)}>
            {isOpen1?'Read less...':'Read more...'}
          </button>
       </div>
     </div>

     {/* this is the second awareness */}
     <div className="flex  p-auto m-6 shadow-2lg w-100">
      <div className="w-1/2 border mr-4 shadow-2lg">
       <h3 className="title cappitalize"> General Truth About Cornae</h3>
      
       <div flex flex-row >
       <div className="float-left ml-3 group">
  <div relative overflow-hidden>
    <img className="h-50 w-72 max-w-xl rounded shadow-2lg" src={cornea} alt="Person 2" />  
    <div className="mt-1 relative h-full w-full bg-black/20 -bottom-10 group-hover:bottom-0 opacity-hover:opacity-100 transition-all duration-300">
      <a href="#eyebank">
        <button className="bg-orange-500 text-white py-2 px-5 hidden group-hover:block">
          go to Video 
        </button>
      </a>
    </div>
  </div>
</div>
       <div className="px-3 cappitalize text-lg " style={isOpen3? null:paragraphStyles} > The cornea is the transparent, dome-shaped front surface of the eye that covers the iris, pupil, and anterior chamber. 
       It serves as the eye's main refractive component, bending and focusing incoming light onto the retina. Composed of five layers, including the epithelium, Bowman's layer, stroma, Descemet's membrane, and endothelium, the cornea lacks blood vessels and instead receives oxygen and nutrients from tears and the aqueous humor.
       </div>
        <button className="bg-blue-500 hover:bg-orange-700 transform hover:scale-110 text-white font-bold py-2 px-4 ml-56 mt-3 rounded-full mb- ml-96" onClick={()=>setIsOpen3(!isOpen3)}>
            {isOpen3?'Read less...':'Read more...'}
          </button>
       </div>
        
     </div>
      
     <div className="w-1/2 border ml-5 mr-10 shadow-2lg" >
      <h3 className="title cappitalize ">Protect Your Eye By Wearing Glass</h3>
     
      <div flex flex-row >
      <div className="float-left ml-3 group">
  <div relative overflow-hidden>
    <img className="h-50 w-64 max-w-xl rounded shadow-2lg " src={imagePath2} alt="Person 2" />  
    <div className="mt-1 relative h-full w-full bg-black/20 -bottom-10 group-hover:bottom-0 opacity-hover:opacity-100 transition-all duration-300">
      <a href="#eyebank">
        <button className="bg-orange-500 text-white py-2 px-5 hidden group-hover:block">
          go to Video 
        </button>
      </a>
    </div>
  </div>
</div>
       <div className="px-3 cappitalize text-lg mr-4"  style={isOpen2? null:paragraphStyles} > It functions by focusing light onto the retina, which captures visual information. Composed of several layers of specialized tissue, including the epithelium, Bowman's layer, stroma, Descemet's membrane, and endothelium, the cornea maintains transparency and structural integrity.
       to facilitate vision. Its transparency, structure, and sensitivity contribute to overall eye health and play a crucial role in visual processes.
   </div>
       
       </div>
     
         <button className="bg-blue-500 hover:bg-orange-700 transform hover:scale-110 text-white font-bold py-2 px-4 ml-96 mt-3 rounded-full mb-6" onClick={()=>setIsOpen2(!isOpen2)}>
            {isOpen2?'Read less...':'Read more...'}
          </button>
       </div>
     </div>
     </div>
     );
}
     export default Awareness;