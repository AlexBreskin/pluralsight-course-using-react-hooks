import ImageToggleOnScroll from "./ImageToggleOnScroll";
import React from "react";

const SpeakerDetail = React.memo(
  ({ id, firstName, lastName, favourite, bio, onHeartFavouriteHandler }) => {
    // console.log("SpeakeDetail:", id, firstName, lastName, favourite);
    return (
      <div className="card col-4 cardmin">
        <ImageToggleOnScroll
          className="card-img-top"
          primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
          secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
          alt={`${firstName} ${lastName}}`}
        />
        <div className="card-body">
          <h4 className="card-title">
            <button
              data-sessionid={id}
              className={favourite ? "heartredbutton" : "heartdarkbutton"}
              onClick={(e) => {
                onHeartFavouriteHandler(e, !favourite);
              }}
            />
            <span>
              {firstName} {lastName}
            </span>
          </h4>
          <span>{bio}</span>
        </div>
      </div>
    );
  }
);

export default SpeakerDetail;
