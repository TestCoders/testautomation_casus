package org.testcoders.movietest.config;

import io.cucumber.core.internal.com.fasterxml.jackson.databind.JavaType;
import io.cucumber.core.internal.com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.DefaultDataTableEntryTransformer;
import lombok.AllArgsConstructor;

import java.lang.reflect.Type;

@AllArgsConstructor
public class DatatableConfig {

    private final ObjectMapper objectMapper;

    @DefaultDataTableEntryTransformer
    public Object defaultDataTableEntryTransformer(Object fromValue, Type toValueType) {
        final JavaType javaType = objectMapper.constructType(toValueType);
        return objectMapper.convertValue(fromValue, javaType);
    }
}
