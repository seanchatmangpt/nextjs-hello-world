import React from "react";

function WorldTable({ worlds }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Intro</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Published At</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {worlds.map((world) => (
          <tr key={world.id}>
            <td>{world.id}</td>
            <td>{world.intro}</td>
            <td>{world.createdAt}</td>
            <td>{world.updatedAt}</td>
            <td>{world.publishedAt}</td>
            <td>{world.author ? world.author.name : "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WorldTable;
