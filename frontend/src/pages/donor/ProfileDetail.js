const ProfileDetail = ({ label, value }) => {
  return (
    <p className="text-xl font-bold text-gray-800 mb-2">
      {label}: <span className="text-gray-700">{value}</span>
    </p>
  );
};


export default ProfileDetail;