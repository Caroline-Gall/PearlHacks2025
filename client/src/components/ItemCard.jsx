import { IconButton, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function ItemCard(props) {

  const { item } = props;
  const navigate = useNavigate();

  function handleClick() {
    let name = (item.name).replace(" ", "-");
    navigate(`/items/${name}`, { state: { item: item } });
  };


  return (
    <div className="relative w-full mx-auto bg-white rounded-lg shadow-md p-3">

      <div className="flex flex-col items-center pt-4 h-full">
        <Button variant="ghost" onClick={() => handleClick()} className="">

          <div className="flex flex-col items-center">
            <img
              className="w-32 h-32 xl:w-48 xl:h-48 object-cover rounded-lg shadow-md bg-gray-50 p-1 mb-4"
              src={item.pic_path}
              alt={item.name}
            />
            <div className="flex items-center justify-items-center">
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
