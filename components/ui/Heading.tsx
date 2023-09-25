import React from "react";

interface Props {
  title: string;
  description: string;
}

const Heading: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="max-lg:w-4/5">
      <h3 className="tracking-tighter font-semibold">{title}</h3>
      <p className="text-muted-foreground max-lg:whitespace-nowrap max-lg:overflow-hidden max-lg:text-ellipsis max-lg:w-4/5">
        {description}
      </p>
    </div>
  );
};

export default Heading;
