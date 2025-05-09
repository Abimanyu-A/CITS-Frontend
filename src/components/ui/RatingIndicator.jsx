export default function RatingIndicator({ score, max = 5 }) {
    return (
      <div className="flex items-center">
        {[...Array(max)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full mx-0.5 ${
              i < score ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  }