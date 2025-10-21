import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface ShowCardProps {
  id: number;
  name: string;
  image: string;
}

const ShowCard: React.FC<ShowCardProps> = ({ id, name, image }) => {
  return (
    <Link to={`/show/${id}`}>
      <Card
        hoverable
        cover={<img alt={name} src={image} className="h-48 object-cover rounded-t-lg" />}
        className="bg-gray-800 border-none transition-transform transform hover:scale-105"
      >
        <Card.Meta title={<span className="text-white text-lg font-semibold">{name}</span>} />
      </Card>
    </Link>
  );
};

export default ShowCard;