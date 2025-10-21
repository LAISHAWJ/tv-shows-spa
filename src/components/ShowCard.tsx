import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface ShowCardProps {
  id: number;
  name: string;
  image: string;
  rating?: number;
}

const ShowCard: React.FC<ShowCardProps> = ({ id, name, image, rating }) => {
  return (
    <Link to={`/show/${id}`}>
      <Card
        hoverable
        cover={
          <img
            alt={name}
            src={image || 'https://via.placeholder.com/300x450?text=HD+Image+Not+Available'}
            className="h-64 w-full object-cover rounded-t-lg transition-all duration-300 glow-hover"
            loading="lazy"
          />
        }
        className="bg-black-bg border-emerald-dark/20 shadow-md hover:shadow-emerald-green/30 transition-all duration-300 rounded-lg fade-in"
      >
        <Card.Meta
          title={<span className="text-white text-lg font-bold truncate">{name}</span>}
          description={
            <div className="flex justify-between text-secondary">
              <span>TV Show</span>
              {rating && <span className="text-emerald-green font-bold">{rating}/10</span>}
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default ShowCard;