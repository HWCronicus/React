import React from "react";

function Events() {
  const today = new Date().toISOString().substr(0, 10);
  return (
    <div className="container">
      <div className="row mt-4 p-2 justify-content-around">
        <div className="col-8">
          <div className="row p-2">
            <div className="card p-3 shadow-sm" style={{ borderRadius: "5px" }}>
              <h1>Event Card</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                iusto? Debitis sint odio voluptas dolorem? Tempora
                exercitationem adipisci iusto odio porro, maxime minus veniam
                officia dolor recusandae atque id cupiditate impedit vel fuga
                est dolorem? Magnam assumenda vero impedit nisi aliquam quaerat
                obcaecati velit dolorem non odit fuga est quod, dolor, incidunt
                animi excepturi quisquam et reiciendis necessitatibus maiores
                doloremque. Nam dolorem odit delectus, doloremque ipsa
                recusandae impedit iure quod perferendis est cum reiciendis
                laborum, assumenda quas pariatur distinctio cupiditate ea
                aperiam suscipit ut nisi! Et molestiae at odio ea explicabo
                error facilis recusandae tempore amet, eius dolor quisquam
                maiores.
              </p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="row p-2">
            <div
              className="card p-3 shadow-sm text-center"
              style={{ borderRadius: "5px" }}
            >
              <h4>Search event by date</h4>
              <div className="row justify-content-around">
                <div className="col-6 p-2">
                  <label htmlFor="dateFrom">From</label>
                  <input
                    type="date"
                    name="dateFrom"
                    className="form-control"
                    defaultValue={today}
                    min={today}
                  />
                </div>
                <div className="col-6 p-2">
                  <label htmlFor="dateFrom">To</label>
                  <input type="date" name="dateTo" className="form-control" />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-5 p-2">
                  <button
                    type="button"
                    className="btn btn-info col-10"
                    name="search"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row p-2">
            <div className="card p-3 shadow-sm" style={{ borderRadius: "5px" }}>
              <h1>Event List</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                aut optio corporis consequuntur, animi, corrupti quae
                aspernatur, error in a voluptatem reiciendis aliquid! Repellat
                quibusdam qui culpa mollitia, perspiciatis ducimus veritatis
                necessitatibus cumque voluptatibus deleniti quae aliquam
                possimus asperiores, magni ad omnis laudantium repudiandae iusto
                autem ipsa unde, libero architecto expedita. Sapiente ad nihil
                labore consequuntur suscipit tenetur molestias at aliquid quam
                molestiae quos quod iusto deserunt laudantium placeat nulla
                recusandae, quasi, saepe soluta veniam, dolore cum sit.
                Doloremque, iste voluptatibus laudantium qui voluptates
                obcaecati sit ullam provident magnam autem molestiae aliquid
                nesciunt tenetur a labore, neque, impedit dicta placeat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
