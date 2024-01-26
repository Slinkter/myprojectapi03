import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import ThemeContext from "../context/context";

export function CardCharacter({ user, handleAddCharacter }) {
  const { id, image, name, gender, species } = user;
  const { darkMode, f_handleChangeMode } = useContext(ThemeContext);

  return (
    <Card className="w-92">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            color={darkMode ? "red" : "black"}
            className="font-medium"
          >
            {name}
          </Typography>
          <Typography
            color={darkMode ? "red" : "black"}
            className="font-medium"
          >
            {gender}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {species}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          color={darkMode ? "black" : "red"}
          onClick={() => handleAddCharacter(user)}
          ripple={false}
          fullWidth={true}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
