package mx.gob.municipio.centro.view.controller.configuracion;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUsuarios;
import mx.gob.municipio.centro.view.bases.ControladorBase;


@Controller

public class ControladorlstUsuarios extends ControladorBase{

	
	private static Logger log = Logger.getLogger(ControladorlstUsuarios.class.getName());
		@Autowired
		GatewayUsuarios gatewayUsuarios;
		
		@Autowired
		GatewayUnidadAdm gatewayUnidadAdm;
		
		public ControladorlstUsuarios(){
			
		}	
		
		
		
		@RequestMapping(value = "/sam/configuracion/lst_usuarios.action", method = RequestMethod.GET)    
		public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
			
			//Convierte en objeto json
			Gson gson = new Gson();
			
			//Devuelve la lista de los beneficiarios al jsp, para cargarlos en la pagina en memoria...
			String json = gson.toJson(getShortPersona());
			modelo.put("jsonbebefi", json);
			modelo.put("personas",gatewayUsuarios.getPersonasTodas());
			return "sam/configuracion/lst_usuarios.jsp";
		}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getShortPersona(){		
		  return this.getJdbcTemplate().queryForList("SELECT   P.CVE_PERS, P.TRATAMIENTO, P.NOMBRE, P.APE_MAT, P.APE_PAT, " + 
					"P.RFC, P.CURP, T.ID_DEPENDENCIA, U.LOGIN, U.PASSWD, U.ACTIVO, C.DEPENDENCIA " + 
					"FROM SAM_PERSONAS AS P " + 
					"INNER JOIN SAM_TRABAJADOR AS T ON (T.CVE_PERS = P.CVE_PERS) " + 
					"LEFT JOIN CAT_DEPENDENCIAS AS C ON (C.ID = T.ID_DEPENDENCIA) " + 
					"INNER JOIN SAM_USUARIOS_EX AS U ON (U.CVE_PERS = P.CVE_PERS) " +
					" ORDER BY NOMBRE");		
	}
	
	
	
	
	
	@RequestMapping(value = "/getTags", method = RequestMethod.GET)
	@ResponseBody
	public List<Map<String, Object>> getTags(@RequestParam (value="term", required=false)String nombre) {

		return simulaSearchPers(nombre);

	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> simulaSearchPers(String nombre){
		
		@SuppressWarnings("unchecked")
		List <Map<String, Object>> lst_Personas = getJdbcTemplate().queryForList("SELECT   P.CVE_PERS, P.TRATAMIENTO, P.NOMBRE, P.APE_MAT, P.APE_PAT, " + 
					"P.RFC, P.CURP, T.ID_DEPENDENCIA, U.LOGIN, U.PASSWD, U.ACTIVO, C.DEPENDENCIA " + 
					"FROM SAM_PERSONAS AS P " + 
					"INNER JOIN SAM_TRABAJADOR AS T ON (T.CVE_PERS = P.CVE_PERS) " + 
					"LEFT JOIN CAT_DEPENDENCIAS AS C ON (C.ID = T.ID_DEPENDENCIA) " + 
					"INNER JOIN SAM_USUARIOS_EX AS U ON (U.CVE_PERS = P.CVE_PERS) " +
					" ORDER BY NOMBRE");
		
		for (Map<String, Object> row: lst_Personas){
			if (((List<Map<String, Object>>) row.get("NOMBRE")).contains(nombre)){
				lst_Personas.add(row);
			}
		}
		System.out.println("Lista de Beneficiarios: " +lst_Personas);
		return lst_Personas;
		
	}
		
	/*	
	@RequestMapping(value = "/configuracion/userNames", method = RequestMethod.GET)
	@ResponseBody
	public List<String> userNames(@RequestParam(value="term", required=false, defaultValue="")String term) {

		List<String> suggestions = new ArrayList<String>();
		suggestions.add("Abraham");
		suggestions.add("Juan");
		suggestions.add("Roberto");
		suggestions.add("Miguel");
		return suggestions;

	}*/
}



