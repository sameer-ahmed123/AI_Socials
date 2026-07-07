import { useState } from "react";
import "./App.css";
import SketchFilter from "./components/layout/SketchFilter";
import Tabs from "./components/ui/Tabs/Tabs";
import TextArea from "./components/ui/Textarea/TextArea";

function App() {
   const [tab, setTab] = useState("for-you");
  return (
    <>
      <SketchFilter />
     
      <Tabs
        items={[
          {id:"home",label:"HOME"},
          { id: "for-you", label: "For You" },
          { id: "following", label: "Following" },
        ]}
        activeTab={tab}
        onChange={setTab}
      />
      {/* <Card variant="surface" hover>
        {" "}
        <div className="post-header">
          <div>
            <Avatar initials="s" size="md">
              as
            </Avatar>

            <div>
              <span className="author-name">Nora Sketch</span>
              <span className="author-handle">@norasketch · 3h</span>
            </div>
          </div>
          <span>...</span>
        </div>
        <div className="post-body">
          <p>
            Spent the morning testing tighter hand-drawn borders. The square
            corners feel more like wireframes, while the soft corners make every
            panel look like it belongs in a notebook.
          </p>

          <div className="nested-notes">
            <div>
              Design Notes <span>@designnotes · 11h</span>
            </div>
            <p>
              A small UI study compares straight borders, rounded borders, and
              gently wobbly borders for dashboard cards.
            </p>

            <div className="emoticon-container">
              <div className="emoticon-circle">:-)</div>
              <div className="emoticon-circle">:D</div>
            </div>
          </div>
        </div>
        <div className="post-actions">
          <span>20</span> <span>28</span> <span>465</span> <span>30K</span>{" "}
          <span>Save</span>
        </div>
        <Button variant="secondary">close</Button>
      </Card> */}
      <TextArea variant="composer"> asd</TextArea>
    </>
  );
}

export default App;
