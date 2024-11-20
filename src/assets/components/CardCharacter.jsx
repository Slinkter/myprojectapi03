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

export function CardCharacter({ user, handleAddCharacter, fav }) {
    const { id, image, name, gender, species } = user;
    const { darkMode } = useContext(ThemeContext);

    return (
        <Card
            className="w-80 md:w-72 md:h-96 border-2 border-gray-100 "
            shadow={true}
        >
            <CardHeader shadow={true} floated={false} className="h-64">
                <img
                    className="h-full w-full object-cover"
                    src={image}
                    alt="card-image"
                />
            </CardHeader>
            <CardBody>
                <div className="mb-2 flex justify-between items-center ">
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
                    ripple={true}
                    fullWidth={true}
                    disabled={fav.some((f) => f.id === id)}
                >
                    Add
                </Button>
            </CardFooter>
        </Card>
    );
}
