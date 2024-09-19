import React from "react";

function Card(props) {
  return (
    <div className="everything-card mt-10 max-w-xl mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* News Image and Title */}
      <div className="flex flex-wrap p-5 gap-4 mb-5 bg-white rounded-lg shadow-md">
        {/* Image */}
        <div className="w-full lg:w-1/3">
          <img
            className="rounded-lg w-full h-full object-cover"
            src={props.imgUrl}
            alt="img"
          />
        </div>
        {/* Title and Description */}
        <div className="w-full lg:w-2/3 flex flex-col justify-between">
          <b className="text-xl font-bold text-gray-900 mb-2">{props.title}</b>
          <p className="text-gray-700 leading-6 text-base">
            {props.description?.substring(0, 150)}...
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          {/* Source Information */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">Source:</span>
            <a
              href={props.url}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {props.source.substring(0, 50)}
            </a>
          </div>
          
          {/* Author and Published Date */}
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-semibold">Author:</span>{" "}
              {props.author || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Published:</span> {props.publishedAt}
            </p>
          </div>
        </div>
      </div>

      {/* New Enhanced Section */}
      <div className="flex lg:flex-row mt-5 bg-white rounded-lg shadow-lg">
        {/* Left Image */}
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l"
          style={{ backgroundImage: `url(${props.imageUrlLeft})` }}
          title={props.imageLeftTitle}
        ></div>
        
        {/* Content */}
        <div className="p-4 flex flex-col justify-between">
          <div className="mb-4">
            <p className="text-sm text-gray-600 flex items-center">
              {props.memberIcon && (
                <svg
                  className="fill-current text-gray-500 w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  {props.memberIcon}
                </svg>
              )}
              {props.memberText}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {props.cardTitle}
            </div>
            <p className="text-gray-700 text-base">{props.cardDescription}</p>
          </div>

          {/* Author Info */}
          <div className="flex items-center">
            {props.authorImage && (
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={props.authorImage}
                alt="Author Avatar"
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{props.authorName}</p>
              <p className="text-gray-600">{props.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
