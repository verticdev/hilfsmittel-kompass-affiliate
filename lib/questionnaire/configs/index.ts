// All questionnaire configs
export { treppenliftConfig } from "./treppenlift"
export { hausnotrufConfig } from "./hausnotruf"
export { badumbauConfig } from "./badumbau"
export { badewannenliftConfig } from "./badewannenlift"
export { elektromobilConfig } from "./elektromobil"
export { elektrorollstuhlConfig } from "./elektrorollstuhl"
export { pflegeboxConfig } from "./pflegebox"
export { alltagshilfeConfig } from "./alltagshilfe"
export { twentyFourHourCareConfig } from "./24h-pflege"

import { treppenliftConfig } from "./treppenlift"
import { hausnotrufConfig } from "./hausnotruf"
import { badumbauConfig } from "./badumbau"
import { badewannenliftConfig } from "./badewannenlift"
import { elektromobilConfig } from "./elektromobil"
import { elektrorollstuhlConfig } from "./elektrorollstuhl"
import { pflegeboxConfig } from "./pflegebox"
import { alltagshilfeConfig } from "./alltagshilfe"
import { twentyFourHourCareConfig } from "./24h-pflege"
import type { QuestionnaireConfig } from "../types"

export const questionnaireConfigs: Record<string, QuestionnaireConfig> = {
  treppenlift: treppenliftConfig,
  hausnotruf: hausnotrufConfig,
  badumbau: badumbauConfig,
  badewannenlift: badewannenliftConfig,
  elektromobil: elektromobilConfig,
  elektrorollstuhl: elektrorollstuhlConfig,
  pflegebox: pflegeboxConfig,
  alltagshilfe: alltagshilfeConfig,
  "24h-pflege": twentyFourHourCareConfig,
}
