import React from "react";
import { render, screen, within } from "@testing-library/react-native";
import RepositoryListContainer from "../components/RepositoryListContainer";
import { describe, it, expect } from "@jest/globals";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");

      expect(repositoryItems).toHaveLength(2);

      // First repository
      expect(
        within(repositoryItems[0]).getByTestId("fullName")
      ).toHaveTextContent("jaredpalmer/formik");
      expect(
        within(repositoryItems[0]).getByTestId("description")
      ).toHaveTextContent("Build forms in React, without the tears");
      expect(
        within(repositoryItems[0]).getByTestId("language")
      ).toHaveTextContent("TypeScript");
      expect(
        within(repositoryItems[0]).getByTestId("stargazersCount")
      ).toHaveTextContent("21.9k");
      expect(
        within(repositoryItems[0]).getByTestId("forksCount")
      ).toHaveTextContent("1.6k");
      expect(
        within(repositoryItems[0]).getByTestId("reviewCount")
      ).toHaveTextContent("3");
      expect(
        within(repositoryItems[0]).getByTestId("ratingAverage")
      ).toHaveTextContent("88");

      // Second repository
      expect(
        within(repositoryItems[1]).getByTestId("fullName")
      ).toHaveTextContent("async-library/react-async");
      expect(
        within(repositoryItems[1]).getByTestId("description")
      ).toHaveTextContent("Flexible promise-based React data loader");
      expect(
        within(repositoryItems[1]).getByTestId("language")
      ).toHaveTextContent("JavaScript");
      expect(
        within(repositoryItems[1]).getByTestId("stargazersCount")
      ).toHaveTextContent("1.8k");
      expect(
        within(repositoryItems[1]).getByTestId("forksCount")
      ).toHaveTextContent("69");
      expect(
        within(repositoryItems[1]).getByTestId("reviewCount")
      ).toHaveTextContent("3");
      expect(
        within(repositoryItems[1]).getByTestId("ratingAverage")
      ).toHaveTextContent("72");
    });
  });
});
