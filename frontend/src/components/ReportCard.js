import {
  DeleteOutlined,
  CheckCircleOutlined,
  DatabaseOutlined,
  GiftOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { Card } from "antd";

const ReportCard = ({ category, number }) => {
  let icon, color, title;

  switch (category) {
    case "discarded":
      icon = <DeleteOutlined />;
      color = "bg-red-500";
      title = "Discarded Cornea";
      break;
    case "evaluated":
      icon = <CheckCircleOutlined />;
      color = "bg-green-500";
      title = "Evaluated Cornea";
      break;
    case "stored":
      icon = <DatabaseOutlined />;
      color = "bg-blue-500";
      title = "Stored Cornea";
      break;
    case "ready":
      icon = <GiftOutlined />;
      color = "bg-yellow-500";
      title = "Ready for Distribution";
      break;
    case "donor":
      icon = <MedicineBoxOutlined />;
      color = "bg-purple-500";
      title = "Registered Donor";
      break;
    default:
      icon = null;
      color = "bg-gray-500";
      title = "Unknown Category";
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 px-2">
      <Card
        className={`${color} text-white`}
        title={title}
        size="small"
        hoverable
      >
        <div className="flex items-center justify-center">
          <div className="text-4xl mr-2">{icon}</div>
          <div>
            <h2 className="text-lg font-bold">{number}</h2>
            <p>Number </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportCard;
