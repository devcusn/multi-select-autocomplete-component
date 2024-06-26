import { CharacterItemProps } from "./types";
import classes from "./style.module.css";

const CharacterItem: React.FunctionComponent<CharacterItemProps> = ({
  name,
  image,
  episode,
}) => {
  return (
    <div className={classes.character_item}>
      <div className={classes.character_image}>
        <img src={image} />
      </div>
      <div className={classes.character_infos}>
        <div
          dangerouslySetInnerHTML={{ __html: name }}
          className={classes.character_name}
        />
        <div className={classes.character_episode}>{episode} Episodes</div>
      </div>
    </div>
  );
};
export default CharacterItem;
