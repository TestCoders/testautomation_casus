package org.testcoders.movietest;

import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;
import org.springframework.test.context.TestPropertySource;

import static io.cucumber.core.options.Constants.*;

@Suite
@SelectClasspathResource("features")
@TestPropertySource("classpath:application.yml")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "org.testcoders.movietest, cucumber.api.spring")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME, value = "json:target/cucumber.json")
@ConfigurationParameter(key = FEATURES_PROPERTY_NAME, value = "classpath:/features/")
@ConfigurationParameter(key = PLUGIN_PUBLISH_QUIET_PROPERTY_NAME, value = "true")
public class CucumberRunner {
}
