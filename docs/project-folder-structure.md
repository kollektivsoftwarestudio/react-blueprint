# Project Folder Structure

> … what does the architecture of your application scream? When you look at the top level directory structure, and the source files in the highest level package; do they scream: **Health Care System**, or **Accounting System**, or **Inventory Management System**? Or do they scream: **Rails**, or **Spring/Hibernate**, or **ASP**? 
[https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
> 

1. **Convey Features and the System Rather Than the Framework**
    - **Objective**: Structure the project in a way that the folders and files immediately communicate what the application does (its features and business logic) rather than how it's built (the underlying framework).
    - **Reason**: This approach ensures that anyone looking at the project, regardless of their familiarity with the specific React framework, can quickly understand the purpose and functionality of the application. It makes the codebase more intuitive and aligns it with the business domain, enhancing the readability and accessibility for developers, stakeholders, and new team members.
2. **Ease of Scaling, Maintenance, and Upgradability**
    - **Objective**: Organize the project so that it can easily accommodate growth and changes, be it adding new features, updating existing ones, scaling the application to handle more complex scenarios, or adding more team members.
    - **Reason**: A scalable and maintainable structure is essential for the longevity of a project. It allows the development team to add new features and refactor existing ones without disrupting the entire architecture. This goal supports a forward-thinking approach to development, ensuring that the project remains robust, flexible, and manageable as it evolves.
3. **Clearly Convey Boundaries**
    - **Objective**: Define clear boundaries within the project, segregating different aspects of the application such as features, utilities, shared components, and services.
    - **Reason**: Clear boundaries in the project structure promote modularity and encapsulation. This separation of concerns makes it easier for developers to work on individual parts of the application without unintended side effects in other areas. It aids in debugging, testing, and understanding the codebase, as each part of the application has a well-defined scope and responsibility.

### **`/src`**

- **Purpose**: The **`/src`** folder is designated as the primary container for the core code of the application. In modern JavaScript projects, the root directory often becomes cluttered with various configuration files, such as bundler setups, linting rules, formatting guidelines, and other miscellaneous files. By isolating the application's source code in the **`/src`** directory, we create a clear separation between the operational aspects of the project (like configurations and dependencies) and the actual codebase.
- **Contents**: All application code

### **`/scenes`**

- **Purpose**: A **`Scene`** represents the highest level of features within a front-end application, independent of the router. This concept goes beyond mere functional grouping; it encapsulates complete user experiences or scenarios. Each scene forms a cohesive unit, integrating all necessary components, logic, and state management for a specific user flow or feature set.
- **Contents**: Within the **`/scenes`** directory, each subfolder corresponds to a specific scene in the application, such as **`patient-management`**. Each of these folders contains the components, hooks, services, and specialized logic unique to that scene. This organization aligns closely with the business domain, making the structure intuitive and reflective of the actual use cases of the application.
    
    **Note:** In a typical front end react project, scenes will map almost always 1:1 to application “pages”, but don’t have to. No routing code outside of hrefs should be within this folder.
    
- **Nested Structure and Scope**: Files and components within each scene are organized based on their scope. Components and logic that are specific to a scene are nested within it, ensuring encapsulation and modularity. If a component or piece of logic evolves to be relevant across multiple scenes, it should be refactored to a more common level in the project structure, such as a shared **`/components`** or `**/hooks**` directory. This ensures that changes within one scene wont have unintended effects on others.

### **`/routes`** (or pages)

- **Purpose:** The **`/routes`** folder is designated as the central hub for all routing-framework-specific code in the application. Its primary role is to contain code that directly correlates to the routing and navigation structure of the app. By isolating routing-related code in this folder, we ensure that changes in the routing framework (such as switching between Next.js, Remix, or React Router) can be managed within this single directory without affecting the rest of the codebase. It also isolates routing state from our tests, saving us additional mocking boilerplate.
- **Contents:** For this example, we created a single [`router.tsx`](../src/routes/router.tsx) file that links up all routes to scenes. For most scenes it called the scene directly; however, in cases where we needed to access the router state with a hook, we created a page component (e.g. [discussion-page.tsx](../src/routes/pages/discussion-page.tsx) that handles the reading of query params and passes them to the scene. If you use file based routing you will have all these files regardless. Lastly we have a [`routes.ts`](../src/routes/routes.ts) file that exports a url factory. This allows us to easily change the url structure of the application without having to change the url in multiple places. This could be skipped if you use a library that gives you typesafe routing out of the box.

### Root **`/components` , `/hooks`, `/providers`**

- **Purpose:** The **`/components`** folder is reserved for domain-specific components that are shared across the entire application. It serves as a central repository for reusable UI elements that have broad applicability within the app but are still tied to the app’s specific domain or functionality
- **Principles of Placement:** The guiding principle is that a component, hook, context, providers, state (etc.) should **reside at the highest level necessary, but no higher.** This means that components should be nested within feature-specific folders (**`/scenes`**) if they are only relevant to that particular feature or scene. For instance, a **`PatientCard`** component used in various parts of the application, such as in patient list views and patient detail pages, would be placed in **`/components`**. However, a component like **`PatientListFilter`**, used exclusively within the **`patient-list`** scene, should remain nested within that specific scene’s folder and not be elevated to the top-level **`/components`**.
- **Avoiding Overgeneralization:** It’s crucial to avoid prematurely moving components to this global folder. Overgeneralizing components can lead to unnecessary complexity and bloated components with too many props and configurations to handle various use cases. Instead, components should be promoted to this global level only when there’s a clear and recurring need across multiple features of the application. **“Duplication is far cheaper than the wrong abstraction.”** [https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

### **`/design-system`**

- **Purpose:** The **`/design-system`** folder is dedicated to housing components that are universal across the entire organization (or multiple applications), beyond the specific domain of the application. These are components that would logically fit into a company-wide design system. Consider the organization’s design language and optimize the components for reusability. Even if you only have one application, consider splitting the components between `/design-system` and `/components`. This will make it easier to extract the design system into its own package in the future.

### **`/services`**

- **Purpose:** The root **`/services`** folder is a place for interactions with external data sources like an organizations API, a third party API, or even the browsers local storage.
- **Placement Rationale:** While service-related logic may often be used within specific scenes, these services are typically placed in the root folder for practical reasons. Many services are either auto-generated or installed via SDKs, making their placement in a shared, accessible location more efficient.
- **Optional decoupling:** To promote decoupling between scenes and services, teams might opt to define interfaces in the scenes and then have the services implement these interfaces. This approach aligns with the principles of clean architecture, ensuring that high-level business logic (in scenes) remains independent from lower-level external services. However, the adoption of this pattern depends on each team's specific needs and the complexity of the application.
- **Ease of testing:** Depending on your approach on testing, if you mock at the network level (e.g. using msw), this isn't as relevant to you. But if you choose not to mock on the network level you may find it useful to be able to easily mock the services layer instead of having to mock your scenes hooks.