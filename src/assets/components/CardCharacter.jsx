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

export function CardCharacter({ user, handleAddCharacter, favorites }) {
    const { id, image, name, gender, species } = user;
    const { darkMode } = useContext(ThemeContext);

    const isFavorite = favorites.some((fav) => fav.id === id);

    return (
        <Card className="  " shadow={true}>
            <CardHeader shadow={true} floated={false}>
                <img
                    className="h-full w-full object-cover object-center"
                    src={image}
                    alt="card-image"
                />
            </CardHeader>
            <CardBody className="">
                <div className=" flex justify-between items-center  ">
                    <Typography
                        color={darkMode ? "red" : "black"}
                        className="font-medium text-left truncate "
                    >
                        {name}
                    </Typography>
                    <Typography
                        color={darkMode ? "red" : "black"}
                        className="font-medium "
                    >
                        {gender}
                    </Typography>
                </div>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75 text-left "
                >
                    {species}
                </Typography>
            </CardBody>
            <CardFooter className="border-2 pt-0 m-0">
                <Button
                    color={darkMode ? "black" : "red"}
                    onClick={() => handleAddCharacter(user)}
                    ripple={true}
                    fullWidth={true}
                    disabled={isFavorite}
                >
                    Add
                </Button>
            </CardFooter>
        </Card>
    );
}
