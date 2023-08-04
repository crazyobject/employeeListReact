import {render,scren} from "@testing-library/react"
import List from "./List";
import celebrityList from "../JSON/celebrity.json";

describe("list component suit",()=>{

    it("list loading snapshot test",()=>{
       const fragment = render(<List celebrityList={celebrityList} />);     
       expect(fragment).toMatchSnapshot();
    })
})