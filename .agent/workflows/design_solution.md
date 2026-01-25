---
description: Design a technical solution (API, DB, Sequence) from requirements
---

1. **Analyze Requirements**
   - Ask the user for the feature description or requirements file.
   - Identify key entities, actors, and data flows.

2. **Generate Artifacts**
   - **Sequence Diagram**: Create a Mermaid sequence diagram (`.mmd`) visualizing the interaction between specific components/services.
   - **Data Model**: Create an Entity Relationship Diagram (ERD) using Mermaid syntax.
   - **API Specification**: Draft a simplified OpenAPI/Swagger YAML snippet for any new endpoints.

3. **Output Location**
   - Create a folder `design/[feature_name]/` if it doesn't exist.
   - Save the artifacts:
     - `design/[feature_name]/sequence.mmd`
     - `design/[feature_name]/schema.mmd`
     - `design/[feature_name]/api.yaml`
   - Create a summary markdown file `design/[feature_name]/design_doc.md` embedding the diagrams and explaining the choices.

4. **Validation**
   - Ask the user to review the generated design against the requirements.
