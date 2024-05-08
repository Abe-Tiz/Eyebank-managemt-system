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
    case "cornea":
      icon = <DeleteOutlined />;
      color = "bg-blue-500";
      title = "Total No Cornea";
      break;
    case "evaluted":
      icon = <CheckCircleOutlined />;
      color = "bg-green";
      title = "Total Evaluated Cornea";
      break;
    case "serology":
      icon = <DatabaseOutlined />;
      color = "bg-blue-500";
      title = "Total Serology Tested Cornea";
      break;
    case "physicalExamined":
      icon = <GiftOutlined />;
      color = "bg-yellow-500";
      title = "Total Physical Examined";
      break;
    case "pledeged":
      icon = <MedicineBoxOutlined />;
      color = "bg-purple-500";
      title = "Total Pledged People";
      break;
    case "distributed":
      icon = <MedicineBoxOutlined />;
      color = "bg-blue-900";
      title = "Total Distributed Cornea";
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
